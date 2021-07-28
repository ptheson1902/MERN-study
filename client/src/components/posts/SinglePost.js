import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons.js'
import Moment from 'react-moment'

const SinglePost = ({
    post: { _id, status, title, description, url, createAt, updateAt },
}) => {
    return (
        <Card
            className="shadow"
            border={
                status === 'Learned'
                    ? 'success'
                    : status === 'Learning'
                    ? 'warning'
                    : 'danger'
            }
        >
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className="post-title">{title}</p>
                            <Badge
                                pill
                                className={
                                    status === 'Learned'
                                        ? 'text-success bg-danger'
                                        : status === 'Learning'
                                        ? 'text-warning bg-success'
                                        : 'text-danger bg-warning'
                                }
                            >
                                {status}
                            </Badge>
                        </Col>

                        <Col style={{ textAlign: 'right' }}>
                            <ActionButtons url={url} _id={_id} />
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text style={{ textAlign: 'right' }}>
                    Created At :{' '}
                    <Moment format="YYYY/ MM/ DD hh:mm">{createAt}</Moment>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SinglePost
