const addrBal =  [
	{
		"inputs": [],
		"name": "destroy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "withdrawETH",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "withdrawToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_addresses",
				"type": "address[]"
			}
		],
		"name": "getBalances",
		"outputs": [
			{
				"internalType": "uint256[5000]",
				"name": "_balances",
				"type": "uint256[5000]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract Token",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_addresses",
				"type": "address[]"
			}
		],
		"name": "getTokenBalances",
		"outputs": [
			{
				"internalType": "uint256[5000]",
				"name": "_balances",
				"type": "uint256[5000]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_addresses",
				"type": "address[]"
			}
		],
		"name": "getTotalBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_balances",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default addrBal
