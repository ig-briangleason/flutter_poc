import * as React from "react";
import LoadingIndicator from "@Client/components/loading-indicator";

export type LoadingProps<TProps extends object> = { loading: true } | { loading: false } & TProps;

export function withLoading<TProps extends object>(ComponentFactory: React.ComponentClass<TProps>): React.ComponentClass<LoadingProps<TProps>> {
  return class extends React.Component<LoadingProps<TProps>, {}> {
    render() {
      if (this.props.loading) {
        return <div style={{margin: 'auto'}}><LoadingIndicator/></div>;
      }
      return <ComponentFactory {...this.props as any} />;
    }
  };
}
