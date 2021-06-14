import { useState } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PredictionList from "../PredictionList";
import "./style.css";

function PoolList({ data }) {
  const { path, url } = useRouteMatch();
  const [selected, setSelected] = useState();

  const handleListItemClick = (e, id) => setSelected(id);

  const pools = data
    ? data.map((pool) => (
        <Link to={`${url}/prediction/${pool.nanoId}`}>
          <ListItem
            button
            selected={selected === pool.nanoId}
            onClick={(e) => handleListItemClick(e, pool.nanoId)}
          >
            <ListItemText primary={pool.nanoId} key={pool.id} />
          </ListItem>
        </Link>
      ))
    : null;

  return (
    <div>
      <div className="pool-list__container">
        <div className="pool-list__header">Active Pools</div>
        <List className="pool-list__item" component="nav">
          {pools}
        </List>
      </div>
      <Switch>
        <Route path={`${path}/prediction/:pool`} component={PredictionList} />
      </Switch>
    </div>
  );
}

export default PoolList;
