# 🚀 NFT Marketplace (Personal Project)

A full-stack **Web3 NFT Marketplace** built to explore real-world decentralized application architecture — including blockchain interaction, indexing, compliance, and modern frontend patterns.

---

## ✨ Overview

This application allows users to:
- Mint NFTs
- List NFTs for sale
- Buy NFTs using USDC
- View recently listed NFTs (via indexing)
- Perform optional compliance checks on wallet addresses

---

## 🧱 Tech Stack

**Frontend**
- Next.js
- TypeScript

**Web3**
- Wagmi
- WalletConnect

**Blockchain**
- Foundry (Anvil)

**Backend / Indexing**
- Rindexer
- GraphQL
- PostgreSQL

**Payments & Compliance**
- USDC (Circle APIs)

**DevOps**
- Docker

---

## ⚙️ Architecture

1. Local Blockchain (Anvil)  
2. Indexer (Rindexer + GraphQL + Postgres)  
3. Frontend (Next.js)  

---

## 📦 Features

- NFT Minting
- NFT Listing
- NFT Buying
- Recently Listed NFTs
- Wallet Integration
- Compliance Checks (optional)

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js (>= 18)
- pnpm
- Git
- Foundry (Anvil)
- Docker
- Rindexer

---

## 🔐 Environment Variables

Create a `.env.local` file:

NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id  
GRAPHQL_API_URL=http://localhost:3001/graphql  
ENABLE_COMPLIANCE_CHECK=false  
CIRCLE_API_KEY=TEST_API_KEY  

---

## 📥 Installation

git clone <your-repo-url>  
cd nft-marketplace  
pnpm install  

---

## ▶️ Running the Application

pnpm anvil  
pnpm indexer  
pnpm dev  

---

## 🔄 Database Reset

pnpm run reset-indexer  

---

## 🧾 Test Contracts

USDC: 0x5FbDB2315678afecb367f032d93F642f64180aa3  
Marketplace: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512  
CakeNFT: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0  
MoodNFT: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9  

---

## 🚧 Future Improvements

- UI/UX improvements
- Multi-chain support
- Performance optimizations
- Production deployment

---

## 📌 Notes

This project demonstrates end-to-end Web3 application development including indexing and compliance layers.
