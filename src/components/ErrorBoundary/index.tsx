import React, { Component, ErrorInfo } from 'react';
import { Logger } from '@services/logger';
import Notification from '@components/Notification';

import Error from './Error';

interface IErrorBoundaryState {
    hasError: boolean; // 是否报错
    errorMessage: string;
}

export default class ErrorBoundary extends Component<{}, IErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: ''
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({ hasError: false });
        });
    }

    componentDidCatch(error, info) {
        var errorMessage = '';
        console.error(error, info);
        if(/Loading chunk .* failed/.test(error.toString())) {
            errorMessage = "加载页面失败，可能有新版本发布，请刷新页面！";
        }
        else {
            Logger.Error('ErrorBoundary catch error', error);
        }
        this.setState({ hasError: true,errorMessage });
        Notification.Confirm({
            subText: error
        });
    }

    render() {
        return this.state.hasError ? <Error errorMessage={this.state.errorMessage} /> : this.props.children;
    }
}
