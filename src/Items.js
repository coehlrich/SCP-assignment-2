import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import getItems from "./getItems";

function Item() {
    var { id } = useParams();
    var short = id;
    while (short.startsWith("0")) {
        short = short.replace("0", "");
    }

    const [itemsState, setState] = useState([]);
    useEffect(() => getItems(setState), []);
    var found = null;
    if (typeof itemsState != "undefined") {
        itemsState.forEach((item) => {
            if (item.item === short) {
                found = item;
            }
        })
    }
    if (found == null) {
        return(
            <div>
                Loading...
            </div>
        )
    }
    
    return(
        <div>
            <div className="display-3"><b>Item:</b> SCP-{id}</div>
            <div className="display-4"><b>Item Class:</b> {found.class}</div>
            <Accordion>
                <Accordion.Item eventKey="containment">
                    <Accordion.Header>Special Containment Procedures</Accordion.Header>
                    <Accordion.Body>
                        <Format content={found.containment}/>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="description">
                    <Accordion.Header>Description</Accordion.Header>
                    <Accordion.Body>
                        <Format content={found.description}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

function Format(params) {
    console.log(params);
    var paragraphs = params.content.split("\\n\\n");
    var parts = [];
    
    for (var i = 0; i < paragraphs.length; i++) {
        parts.push({content: paragraphs[i], key: i})
    }

    return(
        <div>
            {
                parts.map(value => 
                    <p key={value.key}>
                        {value.content}
                    </p>
                )
            }
        </div>
    )
}

export default Item;