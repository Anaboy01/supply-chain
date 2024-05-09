import { ethers } from 'hardhat';

async function main() {
  const supplyChain = await ethers.deployContract('SupplyChain');

  await supplyChain.waitForDeployment();

  // console.log(supplyChain)

  console.log('Contract Deployed at ' + supplyChain.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// CA: 0x7D1f72Bb026aDF377D1a27cdC5F0e45C7e3380A8