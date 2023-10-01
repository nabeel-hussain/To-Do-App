import React, { Component, type ErrorInfo } from 'react';

// Define the Props interface for the ErrorBoundary component
interface Props {
   children: React.ReactNode; // The content wrapped by the ErrorBoundary
}

// Define the State interface for the ErrorBoundary component
interface State {
   hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
   constructor(props: Props) {
      super(props);
      this.state = { hasError: false };
   }

   // componentDidCatch is a lifecycle method that's called when an error occurs
   componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
      console.error('ErrorBoundary caught an error: ', error, errorInfo);

      // Set the state to indicate that an error has occurred
      this.setState({ hasError: true });
   }

   // Render method of the ErrorBoundary component
   render() {
      // If an error has occurred, render an error message
      if (this.state.hasError) {
         return <h1>Something went wrong.</h1>;
      }

      // If no error has occurred, render the wrapped content (children)
      return this.props.children;
   }
}

// Export the ErrorBoundary component
export default ErrorBoundary;
