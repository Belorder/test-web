import { Button, Form, Input, notification, Space, Typography } from 'antd'
import { AuthStoreContext } from 'frontend/modules/auth/auth.store'
import { useCallback, useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
const useTranslations = require('react-i18next')

import styled from 'styled-components'


export default function AuthLoginPage() {
  const { t } = useTranslation()

  const { login } = useContext(AuthStoreContext)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState('');

  function checkError(username, password) {
    let result = ""
      if (username === '') {
        result = t('auth.login.errors.username')
      } else {
        if (password === '') {
          result = 'Password is required'
        } else if (password.includes('N')) {
          result = 'Password cannot contain N, why? because of reasons'
        } else {
          if    (username === password) {
            result = 'Password cannot be same as username'
          } else if (username === 'test') {
            result = 'username cannot be test';
          }
        }
      }
      if (result === '') {
        return '';
      } else {


        return result;
      }
  }


  const error = useMemo(  () => {
    checkError(username, password)
  }, [password])

  const onSubmit = useCallback(async () => {
    const result = await login(username, password)
    if (!result) {
      notification.error({
        message: 'Invalid credentials',
      })
    }
  }, [])

  return (
    <Wrapper id="AuthLoginPage">




      <div className="container">
        <img className="banner" src="/images/banner.png" />
        <div className="form-container">
          <Typography.Title className="title" level={2}>
            Conectate
          </Typography.Title>
          <Form
            className="form"
            name="login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onSubmit}
            size="large">
            <Space direction="vertical">
              <Form.Item label="USUARIO">
                <Input value={username} onChange={(ev) => setUsername(ev.target.value)} />
              </Form.Item>

      <Form.Item label="PassWord">
        <Input.Password
        value={password} onChange={(ev) => setPassword(ev.target.value)}
        />
      </Form.Item>

              <Form.Item wrapperCol={{ offset: 10 }} help={error}>
                <Button type="primary" block disabled={error} htmlType="submit">
                  {t('submit')}
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;

  .container {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 6px;
    background-color: white;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);

    .form {
      padding: 2em;
    }

    .title {
      text-align: center;
      padding-top: 40px;
    }
  }

  .banner {
    width: 550px;
    height: 100%;
  }
`
