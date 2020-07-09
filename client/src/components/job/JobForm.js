import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addJob } from '../../actions/job';
import { Textarea } from '../common/Textarea';
import { Input } from '../common/Input';
import { Paragraph } from '../common/Edit-Create-Profile';
import { Form } from '../common/SignIn-SignUp';
import { Button } from '../common/Button';

const JobForm = ({ addJob }) => {
  const [description, setDescription] = useState(' ');
  const [title, setTitle] = useState(' ');
  const [hideForm, setHideForm] = useState(true);
  const [loading, setLoading] = useState(false);

  function goBack() {
    window.history.go(0);
  }

  return (
    <>
      <Button floatRight='true' small='true' noBorder='true' onClick={goBack}>
        X
      </Button>
      <h3>__create a job</h3>
      <Form
        onSubmit={e => {
          e.preventDefault();
          addJob({ description, title });
          setDescription(' ');
          setTitle(' ');
          setLoading(true);
          goBack();
        }}
      >
        <Paragraph>__job title</Paragraph>
        <Input
          name='text'
          placeholder='* job title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        ></Input>
        <Paragraph>__job description</Paragraph>
        <Textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='* job description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        ></Textarea>
        <Input disabled={loading} value='add job' type='submit'></Input>
      </Form>
    </>
  );
};

JobForm.propTypes = {
  addJob: PropTypes.func.isRequired
};

export default connect(null, { addJob })(withRouter(JobForm));
