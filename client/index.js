const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
const INDEX_NICELIST_NAME_FOR_PROOF_CALC = 34;
const LEAF = niceList[34];
const merkleTree = new MerkleTree(niceList);

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

try{
  const root = merkleTree.getRoot();
  const proof = merkleTree.getProof(INDEX_NICELIST_NAME_FOR_PROOF_CALC);
  console.log("root", root);
  console.log("proof", proof);
  console.log( `Proof generated for nicelist[${INDEX_NICELIST_NAME_FOR_PROOF_CALC}]:`,
   niceList[INDEX_NICELIST_NAME_FOR_PROOF_CALC]);

  const body = {
    proof,
    leaf: LEAF,
  };

  const { data: gift } = await axios.post(`${serverUrl}/gift`, body
    // TODO: add request body parameters here!
    
  );

  console.log({ gift });
}
catch(error){
  console.log("In catch block logging error.message:", error.message);
}

}
main();