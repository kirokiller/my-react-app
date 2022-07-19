import { Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { flushSync } from "react-dom";
interface Props {}

type DataType = {
  age: number;
  name: string;
};

const columns: ColumnsType<DataType> = [
  {
    title: "name",
    dataIndex: "name",
  },
  {
    title: "age",
    dataIndex: "age",
  },
];

const data = [
  {
    age: 13,
    name: "mario",
  },
  {
    age: 10,
    name: "xiaolan",
  },
  {
    age: 10,
    name: "xiaohong",
  },
];

const getApiData = async ({
  current,
  pageSize,
}: {
  current: number;
  pageSize: number;
}) => {
  const start = (current - 1) * pageSize;
  const end = start + pageSize;
  return {
    total: 3,
    data: [...data.slice(start, end)],
  };
};

const PAGESIZE = 1;

const TableTest: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [current, setCurrent] = useState(1);
  const [end, setEnd] = useState(false);
  useEffect(() => {
    const fetchData = async ({ current }: { current: number }) => {
      console.log("set loading true");
      setLoading(true);
      const res = await getApiData({ current, pageSize: PAGESIZE });
      const { data, total } = res;
      console.log("set dataSource");
      setDataSource((dataSource) => [...dataSource, ...data]);
      console.log("set end");
      setEnd(current * PAGESIZE >= total);
      console.log("set loading false");
      setLoading(false);
    };
    fetchData({ current });
    return () => {};
  }, [current]);

  useEffect(() => {
    console.log("useEffect dataSource:", dataSource);
  }, [dataSource]);

  useEffect(() => {
    console.log("useEffect end:", end);
    console.log("useEffect loading22:", loading);
  }, [end, loading]);

  useEffect(() => {
    console.log("useEffect loading:", loading);
  }, [loading]);

  const loadMore = useMemo(() => {
    const fn = () => {
      console.log("click setCurrent");
      setCurrent((current) => current + 1);
    };
    return fn;
  }, []);

  const TableFooter = () => {
    return end ? (
      <div>加载完成</div>
    ) : (
      <div onClick={loadMore} style={{ cursor: "pointer" }}>
        加载更多
      </div>
    );
  };

  console.log("dataSource:", dataSource);
  return (
    <Table
      dataSource={dataSource}
      loading={loading}
      columns={columns}
      pagination={false}
      footer={TableFooter}
      rowKey="name"
    />
  );
};

export default TableTest;
