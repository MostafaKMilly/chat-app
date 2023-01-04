import React from "react";
import {
  Autocomplete,
  TextField,
  createFilterOptions,
  ListItem,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import API from "../../../../../api/httpClient";

const UsersQuery = {
  queryKey: ["users"],
  queryFn: () => API.get("/chats/users"),
  cacheTime: 0,
};

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option: any) => option.phone,
});

function UsersSelect(props: UsersSelectProps) {
  const { data, isLoading } = useQuery(UsersQuery);

  return (
    <Autocomplete
      options={data?.data}
      loading={isLoading}
      renderInput={(params) => <TextField {...params} label="Users" />}
      getOptionLabel={(option: any) => option.firstName + " " + option.lastName}
      filterOptions={filterOptions}
      value={props.value}
      onChange={(_, value) => props.onChange(value.id)}
      renderOption={(props, option) => (
        <ListItem {...props} key={props.id}>
          {option.firstName + " " + option.lastName}
        </ListItem>
      )}
    />
  );
}

type UsersSelectProps = {
  value: number | undefined;
  onChange: (value: number) => void;
};

export default UsersSelect;
