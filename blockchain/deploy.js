async function main() {
  const CertificateIssuer = await ethers.getContractFactory("CertificateIssuer");
  const certificateIssuer = await CertificateIssuer.deploy();
  await certificateIssuer.deployed();
  console.log("CertificateIssuer deployed to:", certificateIssuer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });



//0xd35760e2399360C2Db013eaB657C59Acc10385AE - contract address