import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";

const Search = () => {
  const [keyWord, setKeyWord] = useState("");
  const [result, setResult] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await [1, 2, 3];
      setResult(res);
    };
    return () => {
      fetchData();
    };
  }, [keyWord]);

  console.log("Search: render");
  return (
    <div>
      <Input value={keyWord} onChange={setKeyWord} />
      <div>
        {result.map((item, index) => (
          <div key={index}>item {index}</div>
        ))}
      </div>
    </div>
  );
};

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}
const Input: React.FC<InputProps> = ({ value, onChange }, forwardRef) => {
  // const inputRef = useRef<any>(null);
  /* useImperativeHandle(forwardRef, () => ({
    focus: () => {
      inputRef.current && inputRef.current.focus();
    },
  })); */

  const handleChange = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return <input onChange={handleChange} value={value} /* ref={inputRef} */ />;
};

export default Search;
