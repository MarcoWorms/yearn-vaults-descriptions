import	React							from	'react';
import	{parseMarkdown}					from	'utils';
import	IconRocket						from	'components/icons/IconRocket';

function	Strategies({strategiesData, vaultSymbol, chainExplorer, shouldHideValids, isRetired}) {
	if (strategiesData.length === 0) {
		return (
			<section aria-label={'STRATEGIES'}>
				<div className={'w-full text-ygray-200 dark:text-dark-50 dark:text-dark-50'}>
					<i
						className={'text-xs'}
						dangerouslySetInnerHTML={{__html: parseMarkdown('No strategy detected.')}} />
				</div>
			</section>
		);
	}

	const	strategiesWithBoost = ['Curve Boost', 'Convex Reinvest'];
	return (
		<section aria-label={'STRATEGIES'} className={'mt-4 '}>
			{
				strategiesData.filter(s => shouldHideValids ? !s.description : true).map((strategy, index) => (
					<div key={index} className={'flex flex-col ml-4 md:ml-12 relative'}>
						<div className={'text-ygray-200 dark:text-dark-50 mb-4'}>
							<div className={'mb-2 flex flex-row items-center'}>
								<a href={`${chainExplorer}/address/${strategy.address}#code`} target={'_blank'} className={'inline text-yblue underline'} rel={'noreferrer'}>
									{strategy.name}
								</a>
								<div>
									{strategy.noIPFS ? (
										<span className={'bg-tag-withdraw text-ygray-200 dark:text-dark-50 font-bold rounded-md px-2 text-xs py-1 ml-2'}>
											{'Missing IPFS file'}
										</span>
									) : null}
									{!isRetired && strategiesWithBoost.includes(strategy.name) ? (
										<IconRocket className={'ml-2'} width={16} height={16} />
									): null}
								</div>
							</div>
							<div className={'w-full pr-4 md:pr-16'}>
								{strategy?.description ? 
									<p className={'inline'} dangerouslySetInnerHTML={{__html: parseMarkdown(strategy?.description.replace(/{{token}}/g, vaultSymbol) || '')}} />
									:
									<i className={'inline'} dangerouslySetInnerHTML={{__html: parseMarkdown('No description provided for this strategy.')}} />
								}
							</div>
						</div>
					</div>
				))
			}
		</section>
	);
}

export default Strategies;