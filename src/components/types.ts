export interface INFTItem {
    rindexerId: string,
    seller: string,
    nftAddress: string,
    price: string,
    tokenId: string,
    contractAddress: string,
    txHash: string,
    blockNumber: string
}

export interface INFTQueryResponse {
    data: {
        allItemListeds: {
            nodes: INFTItem[],
        },
        allItemBoughts: {
            nodes: INFTItem[],
        },
        allItemCanceleds: {
            nodes: INFTItem[],
        }
    }
}

export interface INFTBoxProps {
    tokenId: string
    contractAddress: string
    price: string
}

export interface INFTContractFormProps {
    contractAddress?: `0x${string}`
}

export interface InputFormProps {
    label: string
    placeholder: string
    value?: string
    type?: string
    large?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}