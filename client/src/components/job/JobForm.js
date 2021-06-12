import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { addJob } from '../../actions/job';
import { Textarea } from '../common/Textarea';
import { Input } from '../common/Input';
import { Paragraph } from '../common/Edit-Create-Profile';
import { Form } from '../common/SignIn-SignUp';
import { Button } from '../common/Button';
import TextEditor from '../richText/TextEditor';

const RequiredText = styled.p`
    padding: 0 0 0 16px;
    margin: 0;
`;

const StyledSelect = styled.select`
    padding: 4px 8px;
    border: 1px solid gray;
    border-radius: 4px;
    font-size: 1em;
    margin-bottom: 8px;
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    background: transparent;
    color: #bfbdbc;
    :focus {
        outline: none !important;
    }
`;

const JobForm = ({ addJob, history, close }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [jobType, setJobType] = useState('');
    const [location, setLocation] = useState('');
    const [jobField, setJobField] = useState('');

    const updateDescription = arg => {
        setDescription(arg);
    };

    const onSumbit = e => {
        e.preventDefault();
        addJob(
            {
                title,
                description,
                jobType,
                location,
                jobField
            },
            history
        );
        goBack();
    };

    function goBack() {
        window.history.go(0);
    }

    return (
        <>
            <Button
                floatRight='true'
                small='true'
                noBorder='true'
                onClick={close}
            >
                X
            </Button>
            <Paragraph>__create a job</Paragraph>
            <RequiredText>
                <small>
                    <span
                        style={{
                            color: '#F16350'
                        }}
                    >
                        * = required fields
                    </span>
                </small>
            </RequiredText>
            <Form onSubmit={e => onSumbit(e)}>
                <Input
                    type='text'
                    name='title'
                    placeholder='* job title'
                    value={title}
                    onChange={e => {
                        e.preventDefault();
                        setTitle(e.target.value);
                    }}
                    onClick={e => {
                        e.preventDefault();
                    }}
                    required
                ></Input>
                <TextEditor
                    cols='30'
                    rows='5'
                    name='description'
                    placeholder='* job description'
                    description={description}
                    updateDescription={updateDescription}
                    required
                />
                <StyledSelect
                    name='jobField'
                    required
                    value={jobField}
                    onChange={e => {
                        setJobField(e.target.value);
                    }}
                >
                    <option value='0'>* select job field</option>
                    <option value='design'>design</option>
                    <option value='development'>development</option>
                </StyledSelect>
                <StyledSelect
                    name='jobType'
                    required
                    value={jobType}
                    onChange={e => {
                        setJobType(e.target.value);
                        if (e.target.value === 'remote') {
                            setLocation('from anywhere');
                        }
                        if (e.target.value === 'on location') {
                            setLocation('');
                        }
                    }}
                >
                    <option value='0'>* select location</option>
                    <option value='remote'>remote</option>
                    <option value='on location'>on location</option>
                </StyledSelect>
                {jobType === 'on location' && (
                    <Input
                        type='text'
                        name='location'
                        placeholder='* add city'
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        required
                    ></Input>
                )}
                <Input value='add job' type='submit'></Input>
            </Form>
        </>
    );
};

JobForm.propTypes = {
    addJob: PropTypes.func.isRequired
};

export default connect(null, { addJob })(withRouter(JobForm));
