import BigNumber from 'bignumber.js';

const BigNumberZD = BigNumber.clone({
	DECIMAL_PLACES: 0,
	ROUNDING_MODE: BigNumber.ROUND_DOWN,
});

const RAY = valueToZDBigNumber(10).pow(27);
const HALF_RAY = RAY.dividedBy(2);

function rayMul(a, b) {
	return HALF_RAY.plus(valueToZDBigNumber(a).multipliedBy(b)).div(RAY);
}

export function rayPow(a, p) {
	let x = valueToZDBigNumber(a);
	let n = valueToZDBigNumber(p);
	let z = !n.modulo(2).eq(0) ? x : valueToZDBigNumber(RAY);

	for (n = n.div(2); !n.eq(0); n = n.div(2)) {
		x = rayMul(x, x);

		if (!n.modulo(2).eq(0)) {
			z = rayMul(z, x);
		}
	}
	return z;
}

export function valueToZDBigNumber(amount) {
	return new BigNumberZD(amount);
}

const bn10 = new BigNumber(10);
const bn10PowLookup = {};
function pow10(decimals) {
	if (!bn10PowLookup[decimals]) bn10PowLookup[decimals] = bn10.pow(decimals);
	return bn10PowLookup[decimals];
}
export function valueToBigNumber(amount) {
	return new BigNumber(amount);
}
export function normalizeBN(n, decimals) {
	return valueToBigNumber(n).dividedBy(pow10(decimals));
}
export function normalize(n, decimals) {
	return normalizeBN(n, decimals).toString(10);
}