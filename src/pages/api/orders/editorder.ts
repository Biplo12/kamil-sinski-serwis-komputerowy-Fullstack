import { NextApiRequest, NextApiResponse } from 'next';

import missingArguments from '@/utils/missingArguments';
import prisma from '@/utils/prisma';
import validateMethod from '@/utils/validateMethod';

type TRequestBody = {
  ordertitle: string;
  orderdescription: string;
  price: number;
  orderId: number;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    validateMethod(req.method as string, 'PUT');

    const { ordertitle, orderdescription, price, orderId } =
      req.body as TRequestBody;

    missingArguments({
      ordertitle,
      orderdescription,
      price,
    });

    const order = await prisma.orders.update({
      where: {
        orderId,
      },
      data: {
        ordertitle,
        orderdescription,
        price,
      },
    });

    res
      .status(200)
      .json({ statusCode: 200, message: 'Success', result: order.orderId });
  } catch (err) {
    const typedError = err as Error;
    res.status(500).json({ statusCode: 500, message: typedError.message });
  }
};

export default handler;