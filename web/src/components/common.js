import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


function change_url(x, name=null) {
  if (!name) {
    name = x.repository_fullname_and_number;
  }
  if (x.repository_fullname_and_number.includes("#")) {
    const url = "https://github.com/" + x.repository_fullname_and_number.replace("#", "/pull/");
    
    return <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>;
  }
  return ;
}

function author_url(x) {
  if (x.url) {
    return <a href={x.url} target="_blank" rel="noopener noreferrer">{x.author}</a>;
  }
  return x.author;
}

class LoadingBox extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h1>
                loading
                </h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }
}

class BaseQueryComponent extends React.Component {
  queryBackend(prevProps, name, graph_type, query) {
    // Usefull snippet
    // Object.entries(this.props).forEach(([key, val]) =>
    //   prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    // );
    if (this.props.filter_loaded_from_url !== prevProps.filter_loaded_from_url) {
      query({
        'repository': this.props.filter_repository,
        'name': name,
        'gte': this.props.filter_gte,
        'lte': this.props.filter_lte,
        'interval': this.props.filter_interval,
        'exclude_authors': this.props.filter_exclude_authors,
        'authors': this.props.filter_authors,
        'graph_type': graph_type,
      })
    }
  }
}

export {
  LoadingBox,
  BaseQueryComponent,
  change_url,
  author_url,
}
