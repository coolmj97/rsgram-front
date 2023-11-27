import { Button, Layout, Title } from '@/components';
import styled from 'styled-components';
import SignUpForm from '../features/signUp/SignUpForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { FormEvent, useMemo, useState } from 'react';
import Modal from '@/components/Modal/Modal';
import { useNavigate } from 'react-router';
import { signUpByEmail } from '@/service/auth';
import { useDispatch } from 'react-redux';
import { checkRequestError } from '@/redux/userSlice';
import { updateProfile } from 'firebase/auth';
import { resetForm } from '@/redux/feedSlice';

const SignUpPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const { email, username, password, passwordCheck, isError } = user;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const errorMsg = useMemo(() => {
    if (!username) {
      return '이름을 입력해주세요.';
    }

    if (!email) {
      return '이메일을 입력해주세요.';
    }

    if (!password) {
      return '비밀번호를 입력해주세요.';
    }

    if (!passwordCheck) {
      return '비밀번호 확인을 입력해주세요.';
    }
    if (isError) {
      return '이미 가입된 계정입니다.';
    }
  }, [username, email, password, passwordCheck, isError]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errorMsg) {
      setOpenModal(true);
      return;
    }

    const payload = {
      email,
      password,
      username,
    };

    try {
      const data = await signUpByEmail(payload);
      if (data) {
        updateProfile(data.user, {
          displayName: username,
          // photoURL: 'https://example.com/jane-q-user/profile.jpg',
        });
      }

      dispatch(resetForm());
      setIsSubmitted(true);
    } catch (e: any) {
      if (e.code.includes('email-already-in-use')) {
        dispatch(checkRequestError(true));
        setOpenModal(true);
      }
    }
  };

  return (
    <>
      <Layout>
        <Box>
          {isSubmitted ? (
            <div
              style={{
                marginTop: '60px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SubTitle>회원가입이 완료되었습니다!</SubTitle>
              <Desc>
                머릿속을 떠다니는 생각, 간직하고 싶은 추억
                <br /> 지금 이 순간의 나를 기록해보세요.
              </Desc>
              <Button
                $background="#f0133a"
                $color="#fff"
                $marginTop="48px"
                $fullWidth
                onClick={() => navigate('/login')}
              >
                로그인
              </Button>
            </div>
          ) : (
            <>
              <Title title="회원가입" />
              <SignUpForm onSubmit={onSubmit} user={user} />
            </>
          )}
        </Box>
      </Layout>

      <Modal content={errorMsg} $visible={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default SignUpPage;

const Box = styled.div`
  width: 400px;
  padding: 48px 0;
  margin: 0 auto;
`;

const Desc = styled.div`
  margin-bottom: 24px;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: center;
`;

const SubTitle = styled.div`
  margin-bottom: 24px;
  font-size: 2rem;
  text-align: center;
`;
