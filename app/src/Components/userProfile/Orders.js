import React, { useEffect } from 'react';
import styles from './Orders.module.css';
import { fetchUserOrders } from '../../Redux/Slices/Order/getOrdersSlice'
import { useDispatch, useSelector } from 'react-redux';
import {cancelOrder} from '../../Redux/Slices/Order/cancelOrderSlice'
const Orders = () => {
    const orders = useSelector((state) => state.getUserOrders.orders);
    const canceledProduct = useSelector((state) => state.cancelOrder);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUserOrders())
    },[dispatch, canceledProduct])

    const handleCancel  =(id)=>{
        dispatch(cancelOrder(id))
    }


    console.log(orders);
    return ( 
        <>
            <h3>Note:</h3>
            <p>The only pending orders that you can cancel</p>
            <p>If you paid using Bank Card, your money will return within 5 working days</p>
            <table className={styles.table}>
            <thead>
            <tr>
                <th>Order Number</th>
                <th>Total Amount</th>
                <th>Payment Method</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {orders && orders.map((order) => (
                <tr key={order.id}>
                <td>E-{order.id}</td>
                <td>{order.totalAmount}</td>
                <td>{order.payment_method}</td>
                <td>{order.note}</td>
                <td>{order.status}</td>
                <td>
                    {order.status === 'PENDING' &&
                        <button onClick={()=>{handleCancel(order.id)}} className={styles.deleteButton}>Cancel</button>
                    }
                </td>
                </tr>
            ))}

            </tbody>
            </table>
            {orders.length === 0 &&
                <p className={styles.no_orders}>There are no orders</p>
            }
        </>
     );
}
 
export default Orders;