import React from 'react';

export interface CustomerProps {}

export interface CustomerState {}

class Customer extends React.Component<CustomerProps, CustomerState> {
  render() {
    return <h1>Customers</h1>;
  }
}

export default Customer;
