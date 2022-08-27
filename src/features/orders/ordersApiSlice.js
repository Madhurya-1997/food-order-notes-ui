import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';


const ordersAdapter = createEntityAdapter({});

const initialState = ordersAdapter.getInitialState();


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => 'orders',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedOrders = responseData.data.map(order => {
                    order.id = order._id
                    return order;
                })
                return ordersAdapter.setAll(initialState, loadedOrders);
            },
            providedTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Order', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Order', id }))
                    ]
                } else return [{ type: 'Order', id: 'LIST' }];
            }
        })
    })
})

export const {
    useGetOrdersQuery
} = ordersApiSlice;


// returns the query result object
export const selectOrdersResult = ordersApiSlice.endpoints.getOrders.select();

const selectOrdersData = createSelector(
    selectOrdersResult,
    ordersResult => ordersResult.data // normalized state object with ids and entities
)

// getSelector creates these selectors
export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById,
    selectIds: selectOrderIds,
    // pass in a selector that returns the orders slice of state
} = ordersAdapter.getSelectors(state => selectOrdersData(state) ?? initialState);




