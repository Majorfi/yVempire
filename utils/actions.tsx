import	{ethers}	from	'ethers';

type	TCallback = {
	error: boolean | unknown;
	data: ethers.BigNumber | undefined;
}
type	TApproveToken = {
	provider: ethers.providers.JsonRpcProvider,
	contractAddress: string,
	amount: ethers.BigNumber,
	decimals?: number,
	from: string,
}
export async function	approveToken({
	provider,
	contractAddress,
	amount,
	from
}: TApproveToken, callback: (arg0: TCallback) => void): Promise<void> {
	const	signer = provider.getSigner();
	const	erc20 = new ethers.Contract(
		contractAddress,
		['function approve(address spender, uint256 amount) public returns (bool)'],
		signer
	);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await erc20.approve(from, ethers.constants.MaxUint256);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: amount});
		} else {
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.log(error);
		callback({error: true, data: undefined});
	}
}

type	TMigrateTokens = {
	provider: ethers.providers.JsonRpcProvider,
	contractAddress: string,
	batch: [number, string][],
}
export async function	migrateBachTokens({
	provider,
	contractAddress,
	batch
}: TMigrateTokens, callback: (arg0: TCallback) => Promise<void>): Promise<void> {
	const	abi = ['function migrate(tuple(uint8 service, address coin)[] swap)'];
	const	signer = provider.getSigner();
	const	contract = new ethers.Contract(contractAddress, abi, signer);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await contract.migrate(batch);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: undefined});
		} else {
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		callback({error: error, data: undefined});
	}
}

export async function	checkAllowance({
	provider,
	contractAddress,
	amount,
	from
}: TApproveToken): Promise<boolean> {
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();
	const	erc20 = new ethers.Contract(
		contractAddress,
		['function allowance(address owner, address spender) public view returns (uint256)'],
		signer
	);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	const	allowance = await erc20.allowance(address, from);
	return (ethers.BigNumber.from(allowance).gte(amount));
}