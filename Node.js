const network = 11155111; // or 1 for the Ethereum Mainnet

const seller = "please specificate the address of the seller";

async function pay(value) {
  if (typeof window.ethereum == "undefined") {
    alert("Please install Metamask");
    return;
  }
  // Preparing request to the provider
  let command = { method: "eth_requestAccounts" };
  let accounts = await window.ethereum.request(command);

  let w = new Web3(window.ethereum);

  let current = await w.eth.net.getId();
  // Check the current network
  if (current != network) {
    alert("Please choose the correct network");
    return;
  }

  // Prepare the transaction
  let detail = {
    from: accounts[0],
    to: seller,
    value: w.utils.toWei("" + value, "ether"),
    gasLimit: "21000",
  };
  let result = await w.eth.sendTransaction(detail);

  console.log(result);
  if (result.status) {
    let e = document.getElementById("email");
    alert("We will contact you at " + e.value);
  }
}
