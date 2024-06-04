import { useEffect, useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "use-debounce";

function App() {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue] = useDebounce(inputValue, 1500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ["repoData", selectedOption],
    queryFn: async () => {
      const url =
        selectedOption === "user"
          ? `https://api.github.com/users/${debouncedInputValue}`
          : `https://api.github.com/repos/${debouncedInputValue}`;
      const response = await axios.get(url);
      return response.data;
    },
    enabled: false,
  });

  useEffect(() => {
    if (inputValue && selectedOption !== "") {
      refetch();
    }
  }, [debouncedInputValue, selectedOption]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="flex flex-col gap-2">
        <input
          className="border border-black p-2"
          value={inputValue}
          type="text"
          placeholder="Введите текст"
          onChange={handleInputChange}
        />
        <select
          className="border border-black p-2"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="">Выберите опцию</option>
          <option value="user">user</option>
          <option value="repo">repo</option>
        </select>
      </form>
      <div className="mt-4 h-16">
        {data && (
          <div>
            {selectedOption === "user" && (
              <div>
                <p>Full Name: {data.name}</p>
                <p>Number of Repos: {data.public_repos}</p>
              </div>
            )}
            {selectedOption === "repo" && (
              <div>
                <p>Repository Name: {data.name}</p>
                <p>Number of Stars: {data.stargazers_count}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-center h-16">
        {isLoading && <p className="text-gray-500 font-medium">Загрузка...</p>}
        {error && <p className="text-red-500 font-medium">Произошла ошибка</p>}
      </div>
    </div>
  );
}

export default App;
