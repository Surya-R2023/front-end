// import {
//     Button,
//     Typography,
//     Form,
//     Input,
//     Layout,
//     Card,
//     message,
//     Spin,
//     Avatar,
//   } from "antd";
//   import { UserOutlined, LoginOutlined } from "@ant-design/icons";
//   import { useState } from "react";
//   import { useNavigate } from "react-router-dom";
//   import LoginService from "../../services/login-service";
//   import { HiOutlineUsers } from "react-icons/hi";
// import CustomerLoginService from "../../services/customerlogin-service";
  
//   const { Meta } = Card;
//   const { Text, Title } = Typography;
//   function CustomerLogin() {
//     const [isLoading, setLoading] = useState(false);
//     const service = new CustomerLoginService();
//     const Navigation = useNavigate();
//     const onFinish = (values) => {
//       setLoading(true);
//       service
//         .login(values)
//         .then((response) => {
//           if (response.data.success) {
//             // message.success(response.data.message);
//             service.saveToken(response.data.data);
//             service.saveUserName(values.userName);
//             Navigation("../remote-monitoring");
//           } else message.error(response.data.message);
//         })
//         .catch((error) => {
//           console.log(message);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     };
  
//     const onFinishFailed = (errorInfo) => {
//       console.log("Failed:", errorInfo);
//     };
  
//     return (
//       <Layout
//         style={{
//           height: "100vh",
//           alignItems: "center",
//           justifyContent: "center",
//           backgroundImage: "url(/Picture1.jpg)",
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           // background: "linear-gradient(45deg,  #ffffff 50%,rgb(192 0 0) 50%)",
//         }}
//       >
//         <Card bordered={false} className="login-panel">
//           {/* <Meta
//             title={<span>Smart Fire System</span>}
//             description="Login to the application"
//           />
//           <br /> */}
//           <Spin spinning={isLoading}>
//             <div style={{ textAlign: "center", marginBottom: "40px" }}>
//               <img
//                 src="/logo.png"
//                 style={{ width: "100%", maxWidth: "200px", marginBottom: "20px" }}
//               />
//               {/* <Title level={3}>Smart Fire System</Title> */}
//               {/* <Avatar
//                 icon={<HiOutlineUsers />}
//                 style={{ background: "transparent", color: "#000000" }}
//                 size={70}
//               /> */}
//               <p>
//                 <Text type="secondary">
//                   Enter your credentials to login to the application.
//                 </Text>
//               </p>
//             </div>
  
//             <Form
//               name="basic"
//               initialValues={{
//                 remember: true,
//               }}
//               onFinish={onFinish}
//               autoComplete="off"
//               layout="vertical"
//             >
//               <Form.Item
//                 // label="Username"
//                 name="userName"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input e-mail!",
//                   },
//                 ]}
//               >
//                 <Input suffix={<UserOutlined />} placeholder="Enter User Name" />
//               </Form.Item>
  
//               <Form.Item
//                 // label="Password"
//                 name="password"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input password!",
//                   },
//                 ]}
//               >
//                 <Input.Password placeholder="Enter Password" />
//               </Form.Item>
//               <br />
  
//               <Form.Item>
//                 <Button
//                   block
//                   type="secondary"
//                   icon={<LoginOutlined />}
//                   htmlType="submit"
//                 >
//                   Login
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Spin>
//         </Card>
//       </Layout>
//     );
//   }
//   export default CustomerLogin;
  