import React from 'react';
import toast from 'react-hot-toast';

import logger from '@/lib/logger';
import useCreateOrder from '@/hooks/tanstack/useCreateOrder';
import useFetchOrders from '@/hooks/tanstack/useFetchOrders';
import useFetchStatistics from '@/hooks/tanstack/useFetchStatistics';

import Spinner from '@/components/Common/Spinner';

import { useAppDispatch } from '@/store/store-hooks';

import { IInputValues } from '@/interfaces';
import { setOrders, setStats } from '@/state/orderSlice';

interface ICreateOrderButton {
  inputValues: IInputValues;
}

const CreateOrderButton: React.FC<ICreateOrderButton> = ({
  inputValues,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const { refetch, isLoading } = useCreateOrder(
    inputValues?.firstname,
    inputValues?.lastname,
    inputValues?.email,
    inputValues?.phonenumber,
    inputValues?.ordertitle,
    inputValues?.orderdescription,
    inputValues?.price
  );

  const filters = {
    limit: 100,
    orderBy: 'createdAt',
    orderDirection: 'desc',
  };

  const { refetch: ordersRefetch } = useFetchOrders(filters, false);
  const { refetch: statsRefetch } = useFetchStatistics(false);
  const handleCreateOrder = async () => {
    try {
      const { isError } = await refetch();
      const { data } = await ordersRefetch();
      const { data: statsData } = await statsRefetch();
      dispatch(setOrders(data?.result));
      dispatch(setStats(statsData?.result));
      if (!isError) {
        toast.success('Order created');
        return;
      }
    } catch (err) {
      logger(err);
      toast.error('Error while creating order');
    }
  };

  return (
    <button
      className='bg-sea focus:shadow-outline mt-6 flex min-w-[200px] items-center justify-center rounded-lg px-3
      py-2 text-center font-bold
      text-white transition duration-300 ease-in-out hover:opacity-75 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
      onClick={() => handleCreateOrder()}
    >
      {isLoading ? <Spinner /> : 'Create order'}
    </button>
  );
};
export default CreateOrderButton;
