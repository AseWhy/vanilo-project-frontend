/* eslint-disable @typescript-eslint/no-useless-constructor */
import React from 'react'

export default class ErrorBoundary extends React.Component {
    state: any = { 
        hasError: false
    };

    constructor(props: any) {
        super(props);
    }
  
    static getDerivedStateFromError(error: any) {
        return {
            hasError: true
        };
    }
  
    render() {
        if (this.state.hasError) {
            return <p> Что-то пошло не так... </p>;
        }
  
        return this.props.children;
    }
}