import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import NFTBox from "./NFTBox";
import Link from "next/link";
import { Loader } from "./Loader";
import { INFTQueryResponse } from "./types";

const GET_RECENT_NFTS = `query GetMarketplaceData {
    # Fetch the latest 20 listed items, newest first
    allItemListeds(first: 20, orderBy: [BLOCK_NUMBER_DESC, TX_INDEX_DESC]) {
      nodes {
        rindexerId
        seller
        nftAddress
        price
        tokenId
        contractAddress
        txHash
        blockNumber
      }
    }
    # Fetch all cancellation events (for filtering)
    allItemCanceleds { # Matches the event name indexed by rindexer
      nodes {
        nftAddress
        tokenId
      }
    }
    # Fetch all purchase events (for filtering)
    allItemBoughts { # Matches the event name indexed by rindexer
      nodes {
        tokenId
        nftAddress
      }
    }
}`;

const fetchNFTs = async (): Promise<INFTQueryResponse> => {
    const response = await fetch('/api/graphql', {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json', // Essential for GraphQL
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: GET_RECENT_NFTS,
        }),
    });

    if (!response.ok) {
        console.error("HTTP Error:", response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    if (jsonResponse.errors) {
        console.error("GraphQL Errors:", jsonResponse.errors);
        throw new Error(`GraphQL error: ${jsonResponse.errors.map((e: any) => e.message).join(', ')}`);
    }

    return jsonResponse;
};

function useRecentlyListedNFTs() {
    const { data, isLoading, error } = useQuery<INFTQueryResponse>({
        queryKey: ["recentNFTs"],
        queryFn: fetchNFTs,
    })

    // Use useMemo to avoid reprocessing data when it hasn't changed
    const nftDataList = useMemo(() => {
        if (!data) return []

        // Create sets of bought and canceled NFTs for quick lookup
        const boughtNFTs = new Set<string>()
        const canceledNFTs = new Set<string>()

        data.data.allItemBoughts.nodes.forEach(item => {
            if (item.nftAddress && item.tokenId) {
                boughtNFTs.add(`${item.nftAddress}-${item.tokenId}`)
            }
        })

        data.data.allItemCanceleds.nodes.forEach(item => {
            if (item.nftAddress && item.tokenId) {
                canceledNFTs.add(`${item.nftAddress}-${item.tokenId}`)
            }
        })

        // Filter listed NFTs to only include those that haven't been bought or canceled
        const availableNFTs = data.data.allItemListeds.nodes.filter(item => {
            if (!item.nftAddress || !item.tokenId) return false

            const key = `${item.nftAddress}-${item.tokenId}`
            return !boughtNFTs.has(key) && !canceledNFTs.has(key)
        })

        // Get the top 5
        const recentNFTs = availableNFTs.slice(0, 100)

        // Extract the specific data we need
        return recentNFTs.map(nft => ({
            tokenId: nft.tokenId,
            contractAddress: nft.nftAddress,
            price: nft.price,
        }))
    }, [data])

    return { isLoading, error, nftDataList }
};

// Main component that uses the custom hook
export default function RecentlyListedNFTs() {
    const {isLoading, nftDataList} = useRecentlyListedNFTs();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mt-8 text-center">
                <Link
                    href="/list-nft"
                    className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    List Your NFT
                </Link>
            </div>
            <h2 className="text-2xl font-bold mb-6">Recently Listed NFTs</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {nftDataList.map((nft) => (
                    <Link 
                        href={`/buy-nft/${nft.contractAddress}/${nft.tokenId}`}
                        key={`${nft.contractAddress}-${nft.tokenId}`} 
                    >
                        <NFTBox
                            key={`${nft.contractAddress}-${nft.tokenId}`}
                            tokenId={nft.tokenId}
                            contractAddress={nft.contractAddress}
                            price={nft.price}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}