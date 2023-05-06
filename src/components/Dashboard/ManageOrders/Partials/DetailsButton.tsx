import { useRouter } from 'next/router';
import React from 'react';

interface IDetailsButton {
  orderId: number;
}

const DetailsButton: React.FC<IDetailsButton> = ({ orderId }): JSX.Element => {
  const router = useRouter();
  const handleDetails = () => {
    router.push(`/admin/dashboard/manage-orders/${orderId}`);
  };

  return (
    <button
      onClick={() => handleDetails()}
      className='bg-sea focus:shadow-outline flex max-h-[30px] min-w-[30px] items-center justify-center rounded-lg px-3
      py-2 text-center font-bold
      text-white transition duration-300 ease-in-out hover:opacity-75 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
    >
      Details
    </button>
  );
};
export default DetailsButton;
