# 1. Clone repo
<br>
git clone <your-repo-url>
<br>
cd <your-repo-folder>
<br><br>
# 2. Install dependencies (root contains both hardhat & frontend packages)
<br>
npm install
<br>
# or
<br>
yarn install
<br><br>

# 3. Start a local blockchain (use Ganache or Hardhat node)
<br>
# Option A: Ganache GUI — run Ganache and use RPC http://127.0.0.1:8545
<br>
# Option B: Ganache CLI
<br>
npx ganache-cli -p 8545 -m "test test test test test test test test test test test junk"
<br><br>

# Option C: Hardhat node (alternative)
<br>
npx hardhat node
<br><br>

# 4. Deploy contracts to the local chain
<br>
npx hardhat run scripts/deploy.js --network localhost
<br><br>

# 5. Start frontend
<br>
cd client
<br>
npm start
<br>
# or
<br>
yarn start
<br><br>

# 6. Open your browser -> http://localhost:3000 and connect MetaMask to the local network



