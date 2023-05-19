import React, { useEffect } from 'react';
import styles from './Orders.module.css';
import { fetchUserOrders } from '../../Redux/Slices/Order/getOrdersSlice'
import { useDispatch, useSelector } from 'react-redux';

const Orders = () => {
    const orders = useSelector((state) => state.getUserOrders.orders);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUserOrders())
    },[dispatch])

    console.log(orders);
    return ( 
        <>
            <table className={styles.table}>
            <thead>
            <tr>
                <th>Order Number</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {orders && orders.map((order) => (
                <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.quantity}</td>
                <td>
                    {order.status === 'pending' &&
                        <button className={styles.deleteButton}>Cancel</button>
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