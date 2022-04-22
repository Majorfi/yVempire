import	{TPair}	from	'contexts/useYVempire';

export function	findBySearch(pair: TPair, term: string): boolean {
	if (term.length === 0)
		return true;
	return (
		(pair?.underlyingName || '').toLowerCase().includes(term.toLowerCase()) ||
		(pair?.underlyingAddress || '').toLowerCase().includes(term.toLowerCase()) ||
		(pair?.uToken?.name || '').toLowerCase().includes(term.toLowerCase()) ||
		(pair?.uToken?.address || '').toLowerCase().includes(term.toLowerCase()) ||
		(pair?.yvToken?.name || '').toLowerCase().includes(term.toLowerCase()) ||
		(pair?.yvToken?.address || '').toLowerCase().includes(term.toLowerCase())
	);
}
