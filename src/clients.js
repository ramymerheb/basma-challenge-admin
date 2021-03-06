import "@shopify/polaris/dist/styles.css";
import {
  TextField,
  Page,
  FormLayout,
  Button,
  Card,
  Caption,
} from "@shopify/polaris";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import clientService from "./services/client.service";
import authenticationService from "./services/authentication.service";
import "./client.css";
import { useHistory } from "react-router-dom";

const BACKEND_CLIENTS = process.env.REACT_APP_BACKEND_CLIENTS;

function Clients() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [count, setCount] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hideButton, setHideButton] = useState(false);

  useEffect(() => {
    authenticationService.refresh().then(() => {
      setHideButton(true);
      clientService.getClients(BACKEND_CLIENTS + "1").then((response) => {
        setData(response);
        setHideButton(false);
      });
    });
  }, []);

  const columns = [
    {
      name: "Id",
      selector: "id",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
      right: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      right: true,
    },
    {
      name: "Verified",
      selector: "email_verified_at",
      sortable: true,
      cell: (row) => (
        <div>
          {row.email_verified_at && (
            <p>Yes</p>
          )}
        </div>
      ),
    },
    {
      name: "Image",
      selector: "image",
      cell: (row) => (
        <div>
          {row.image && (
            <img
              style={{ width: 100, height: 100 }}
              src={row.image}
              alt={row.name}
            ></img>
          )}
        </div>
      ),
      sortable: true,
      right: true,
    },
    {
      name: "Created at",
      selector: "created_at",
      sortable: true,
      right: true,
    },
  ];

  return (
    <Page title="Basma Challenge">
      <FormLayout>
        <FormLayout.Group condensed>
          <TextField
            label="Id"
            onChange={(value) => {
              setId(value);
            }}
            value={id}
          />
          <TextField
            label="Name"
            onChange={(value) => {
              setName(value);
            }}
            value={name}
          />
          <TextField
            label="Email"
            onChange={(value) => {
              setEmail(value);
            }}
            value={email}
          />
          <div hidden={hideButton}>
            <Button
              onClick={() => {
                setHideButton(true);
                clientService
                  .getClients(
                    BACKEND_CLIENTS +
                      data +
                      "&rowsPerPage=" +
                      rowsPerPage +
                      "&id=" +
                      id +
                      "&name=" +
                      name +
                      "&email=" +
                      email
                  )
                  .then((response) => {
                    setData(response);
                    setHideButton(false);
                  });
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                authenticationService.signOut().then(() => {
                  history.push("/");
                });
              }}
            >
              Logout
            </Button>
          </div>
        </FormLayout.Group>
      </FormLayout>
      <Card title="Clients">
        <DataTable
        
          title="Arnold Movies"
          columns={columns}
          data={data.data}
          pagination={true}
          paginationPerPage={20}
          paginationRowsPerPageOptions={[20, 40, 60]}
          highlightOnHover
          paginationServer={true}
          paginationTotalRows={data.meta ? data.meta.total : 0}
          onChangePage={(data) => {
            console.log("page ", page);
            setPage(data);
            clientService
              .getClients(
                BACKEND_CLIENTS +
                  data +
                  "&rowsPerPage=" +
                  rowsPerPage +
                  "&id=" +
                  id +
                  "&name=" +
                  name +
                  "&email=" +
                  email
              )
              .then((response) => {
                console.log(response);
                setData(response);
              });
          }}
          onChangeRowsPerPage={(dataRowsPerPage) => {
            console.log(dataRowsPerPage);
            setRowsPerPage(dataRowsPerPage);
            setPage(1);
            clientService
              .getClients(
                BACKEND_CLIENTS +
                  "1&rowsPerPage=" +
                  dataRowsPerPage +
                  "&id=" +
                  id +
                  "&name=" +
                  name +
                  "&email=" +
                  email
              )
              .then((response) => {
                console.log(response);
                setData(response);
              });
          }}
        />
      </Card>
      <FormLayout>
        <FormLayout.Group condensed>
          <div hidden={hideButton}>
            <Button
              onClick={() => {
                setHideButton(true);
                clientService.getCount(1).then((response) => {
                  setCount(response.data);
                  setHideButton(false);
                });
              }}
            >
              Get count for the last 24 hours
            </Button>
            <Button
              onClick={() => {
                setHideButton(true);
                clientService.getCount(7).then((response) => {
                  console.log(response);
                  setCount(response.data);
                  setHideButton(false);
                });
              }}
            >
              Get count for the last week
            </Button>
            <Button
              onClick={() => {
                setHideButton(true);
                clientService.getCount(30).then((response) => {
                  console.log(response);
                  setCount(response.data);
                  setHideButton(false);
                });
              }}
            >
              Get count for the last month
            </Button>
            <Button
              onClick={() => {
                setHideButton(true);
                clientService.getCount(90).then((response) => {
                  console.log(response);
                  setCount(response.data);
                  setHideButton(false);
                });
              }}
            >
              Get count for the last 3 months
            </Button>
            <Button
              onClick={() => {
                setHideButton(true);
                clientService.getCount(365).then((response) => {
                  console.log(response);
                  setCount(response.data);
                  setHideButton(false);
                });
              }}
            >
              Get count for the last year
            </Button>
          </div>
        </FormLayout.Group>
      </FormLayout>
      <Caption>Count: {count ? count : 'Please click on an option'}</Caption>
    </Page>
  );
}

export default Clients;
