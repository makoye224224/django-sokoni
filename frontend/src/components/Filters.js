import { Button, Form } from "react-bootstrap";
import { useStateContext } from "../context/Context";
import Rating from "./Rating";
import { Label } from "@material-ui/icons";

const Filters = ({close}) => {
  const {
    productDispatch,
    productState: { byStock, byFastDelivery, sort, byRating },
  } = useStateContext();

  const handleClick = ()=>{
      productDispatch({
        type: "CLEAR_FILTERS",
      })
      close()
}

  return (
    <div className="container">

      <label>Order</label>
      
      <div>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={{}
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </div>
      <div>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={{}
          }
          checked={sort === "highToLow" ? true : false}
        />
      </div>
      <br/>
      <div>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onClick={{}
          }
          style={{ cursor: "pointer"}}
        />
      </div>
      <br/>
      <label>Other</label>
      <div>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={{}
          }
          checked={byStock}
        />
      </div>
      <div>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_DELIVERY",
            })
          }
          checked={byFastDelivery}
        />
      </div>
      <br/>
      <Button
        variant="default"
        onClick= {handleClick}
        style={{backgroundColor: '#2dace4'}}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
