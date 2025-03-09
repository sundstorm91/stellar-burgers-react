import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-builder.module.css';
import React from 'react';
import { BurgerConstructorState } from '../../services/features/constructor/reducer';

interface RootState {
	builder: BurgerConstructorState;
}

export const BurgerBuilder: React.FC = () => {
	return <div>123</div>;
};
