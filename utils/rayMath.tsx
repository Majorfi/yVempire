import BigNumber from 'bignumber.js';

const BigNumberZD = BigNumber.clone({
	DECIMAL_PLACES: 0,
	ROUNDING_MODE: BigNumber.ROUND_DOWN
});

const RAY = (valueToZDBigNumber(10) as any).pow(27);
const HALF_RAY = RAY.dividedBy(2);

function rayMul(a: BigNumber, b: BigNumber.Value): BigNumber.Value {
	return HALF_RAY.plus((valueToZDBigNumber(a) as any).multipliedBy(b)).div(RAY);
}

export function rayPow(a: BigNumber, p: number): BigNumber.Value {
	let x = valueToZDBigNumber(a) as any;
	let n = valueToZDBigNumber(p) as any;
	let z = !n.modulo(2).eq(0) ? x : valueToZDBigNumber(RAY);

	for (n = n.div(2); !n.eq(0); n = n.div(2)) {
		x = rayMul(x, x);

		if (!n.modulo(2).eq(0)) {
			z = rayMul(z, x);
		}
	}
	return z;
}

export function valueToZDBigNumber(amount: BigNumber.Value): BigNumber.Value {
	return new BigNumberZD(amount);
}

const bn10 = new BigNumber(10);
const bn10PowLookup: any = {};
function pow10(decimals: number): BigNumber.Value {
	if (!bn10PowLookup[decimals])
		bn10PowLookup[decimals] = bn10.pow(decimals);
	return bn10PowLookup[decimals];
}
export function valueToBigNumber(amount: BigNumber.Value): BigNumber.Value {
	return new BigNumber(amount);
}
export function normalizeBN(n: BigNumber.Value, decimals: number): BigNumber.Value {
	return (valueToBigNumber(n) as any).dividedBy(pow10(decimals));
}
export function normalize(n: BigNumber, decimals: number): string {
	return normalizeBN(n, decimals).toString(10);
}