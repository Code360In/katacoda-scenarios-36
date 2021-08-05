import { init } from "@datadog/ui-apps-sdk";
import { useState, useEffect } from "react";
import "./../index.css";
const client = init({ debug: true });

export default function SidePanel() {
  const [email, setEmail] = useState<string>("");
  const [blockList, setBlockList] = useState<string[]>([]);

  async function updateBlocklist() {
    const response = await fetch("http://localhost:3001/blocklist");
    const data = await response.json();
    setBlockList(data.users);
  }

  async function addToBlocklist() {
    await fetch("http://localhost:3001/blocklist", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    updateBlocklist();
  }

  useEffect(() => {
    updateBlocklist();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

      }}
    >
      <div className="container">
        {/* SHOW BLOCKLIST ONLY IF THERE ARE BLOCKED USERS */}

        <div className="row">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e?.target.value);
                }}
              />
              <small id="emailHelp" className="form-text text-muted">
                This address will be blocked from submitting
              </small>
            </div>

            <button
              className="btn btn-primary"
              onClick={addToBlocklist}
              style={{ marginTop: "15px" }}
            >
              Submit
            </button>
          </form>
        </div>

        {blockList.length && (
          <div className="row">
            <label>Currently blocked users</label>
            <ul className="list-group">
              {blockList.map((user) => {
                return <li className="list-group-item">{user}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
