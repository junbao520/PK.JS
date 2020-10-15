import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import ReactDatetime from 'react-datetime';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';

class LogSearch extends React.Component {
  state = {
    date: moment.utc(),
    allDay: true,
    startTime: moment.utc(),
    endTime: moment.utc(),
    searchTerms: ['', '', '']
  };

  constructor(){
    super();

    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount(){
    this.splitSearchString();
  }

  splitSearchString(){
    if(!this.props.searchString) return;
    let [date, startTime, endTime, ...searchTerms] = this.props.searchString.split(';');

    let addTerms = 3 - searchTerms.length % 3;
    if(addTerms !== 3) for(let i = 0; i < addTerms; i++) searchTerms.push('');

    if(startTime === 'null') startTime = null;
    if(endTime === 'null') endTime = null;

    this.setState({
      date: moment.utc(date, 'MM_DD_YY'),
      allDay: !(startTime && endTime),
      startTime: startTime ? moment.utc(startTime.slice(0, -3), 'HH:mm') : moment.utc(),
      endTime: endTime ? moment.utc(endTime.slice(0, -3), 'HH:mm') : moment.utc(),
      searchTerms
    });
  }

  getSearchLink(){
    let searchString =
      `${this.state.date.format('MM_DD_YY')};` +
      `${(this.state.allDay) ? 'null' : this.state.startTime.format('HH:mm:00')};` +
      `${(this.state.allDay) ? 'null' : this.state.endTime.format('HH:mm:00')};` +
      this.state.searchTerms.filter(term => term !== '').join(';');

      return this.props.match.path
        .replace(':serverID', this.props.match.params.serverID)
        .replace('/:searchString', '')
        + '/' + searchString;
  }

  copyToClipboard(){
    navigator.clipboard.writeText(
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':'+window.location.port: '') +
      this.getSearchLink()
    );
  }

  onSearch(){
    this.props.history.push(this.getSearchLink());
  }


  render(){
    return(
      <Card className="bg-secondary shadow">
        <CardHeader>
          <Row className="align-items-center">
            <Col className="col">
              <h3 className="mb-0">日志搜索</h3>
            </Col>
            <Col className="col text-right">
              <Button
                color="primary"
                size="sm"
                onClick={this.copyToClipboard}
              >
                将搜索链接复制到剪贴板
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <h6 className="heading-small text-muted mb-4">日期 / 时间</h6>
          <div className="pl-lg-4">
            <Row>
              <Col md="6">
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <ReactDatetime
                      dateFormat="DD/MM/YY"
                      timeFormat={false}
                      isValidDate={current => current.isBefore(new Date())}
                      value={this.state.date}
                      onChange={date => this.setState({ date })}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md="6">
                <div className="custom-control custom-checkbox mb-3">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    id="all-day"
                    checked={this.state.allDay}
                    onChange={event => this.setState({ allDay: event.target.checked })}
                  />
                  <label className="custom-control-label" htmlFor="all-day">
                    全天
                  </label>
                </div>
              </Col>
              <Col md="6">
                {
                  !this.state.allDay &&
                  (
                    <>
                      <label
                        className="form-control-label"
                      >
                        开始时间
                      </label>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-calendar-grid-58" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <ReactDatetime
                            dateFormat={false}
                            timeFormat="HH:mm"
                            value={this.state.startTime}
                            onChange={startTime => this.setState({ startTime })}
                          />
                        </InputGroup>
                      </FormGroup>
                    </>
                  )
                }
              </Col>
              <Col md="6">
                {
                  !this.state.allDay &&
                  (
                    <>
                      <label
                        className="form-control-label"
                      >
                        结束时间
                      </label>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-calendar-grid-58" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <ReactDatetime
                            dateFormat={false}
                            timeFormat="HH:mm"
                            value={this.state.endTime}
                            onChange={endTime => this.setState({ endTime })}
                          />
                        </InputGroup>
                      </FormGroup>
                    </>
                  )
                }
              </Col>
            </Row>
          </div>
          <hr className="my-4" />
          <h6 className="heading-small text-muted mb-4">
            搜索词
          </h6>
          <div className="pl-lg-4">
            <Row>
              {
                this.state.searchTerms.map((searchTerm, key) => (
                  <Col className="mb-2" md="4" key={key}>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      placeholder={`搜索词 ${key+1}`}
                      value={this.state.searchTerms[key]}
                      onChange={event => {
                        let newSearchTerms = this.state.searchTerms;
                        newSearchTerms[key] = event.target.value;
                        this.setState({ searchTerms: newSearchTerms });
                      }}
                    />
                  </Col>
                ))
              }
            </Row>
            <Row className="mt-2 justify-content-between">
              <Col className="mb-2" sm="auto">
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => {
                    let newSearchTerms = this.state.searchTerms;
                    newSearchTerms.splice(0, 3);
                    this.setState({ searchTerms: newSearchTerms });
                  }}
                >
                  更少的搜索词
                </Button>
              </Col>
              <Col className="mb-2" sm="auto">
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => {
                    let newSearchTerms = this.state.searchTerms;
                    newSearchTerms.push('', '', '');
                    this.setState({ searchTerms: newSearchTerms });
                  }}
                >
                  更多的搜索词
                </Button>
              </Col>
            </Row>
            <Row className="mt-4 justify-content-center">
              <Col className="text-center">
                <Button
                  color="primary"
                  onClick={this.onSearch}
                >
                  搜索
                </Button>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(LogSearch);