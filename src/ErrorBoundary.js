import { Box } from '@mui/system';
import React from 'react';
// import { Col, Container, Row } from 'reactstrap';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            info: null
        };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true, error: error, info: info });
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (<div className="app flex-row align-items-center">
                <Box>
                            <div className="clearfix">
                                <h1 className="float-left display-3 mr-4">Oops</h1>
                                <h4 className="pt-3">Something went wrong.</h4>
                                <p className="text-muted float-left">{this.state.error.toString()}</p>
                                {/* <p className="text-muted float-left">{this.state.info.componentStack}</p> */}
                            </div>
                </Box>
            </div>);
        }
        return this.props.children;
    }
}

export default ErrorBoundary