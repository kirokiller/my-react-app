import React, { Component } from "react";
import Search from "../search_test";

interface Props {}

interface State {
  value: string;
}

export default class index extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  render() {
    const { value } = this.state;

    return (
      <div>
        <input
          value={value}
          onChange={(e) => {
            this.setState({
              value: e.target.value,
            });
          }}
        />
        {value}
        <Search />
      </div>
    );
  }
}
