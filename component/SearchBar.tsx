interface SearchBarProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (keyword: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  keyword,
  setKeyword,
  onSearch,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(keyword);
    }
  };

  const handleSearchClick = () => {
    onSearch(keyword);
  };

  return (
    <div>
      <input
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="정류소명을 입력하세요."
      ></input>
      <button onClick={handleSearchClick}>검색</button>
    </div>
  );
};
