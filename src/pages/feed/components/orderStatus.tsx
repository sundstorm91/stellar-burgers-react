import styles from '../../pages.module.css';

export const OrderStatus: React.FC<{
	ready: number[];
	inProgress: number[];
}> = ({ ready, inProgress }) => (
	<div className={styles.statusField}>
		<div className={styles.statusReady}>
			<p className={styles.subTitle}>Готовы:</p>
			{ready.map((num) => (
				<span key={num} className='text text_type_digits-default'>
					{num}
				</span>
			))}
		</div>
		<div className={styles.statusProccess}>
			<p className={styles.subTitle}>В работе:</p>
			{inProgress.map((num) => (
				<span key={num} className='text text_type_digits-default'>
					{num}
				</span>
			))}
		</div>
	</div>
);
