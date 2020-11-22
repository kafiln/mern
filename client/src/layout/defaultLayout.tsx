import { Col, Layout, Row } from 'antd';
import React from 'react';

const { Content, Footer, Header } = Layout;

const DefaultLayout = ({ children }: any) => {
	return (
		<Layout style={{ height: '100vh' }}>
			<Header>
				<p>Resumium</p>
			</Header>
			<Content style={{ flex: 'auto' }}>
				<Row>
					<Col span={12} offset={6}>
						{children}
					</Col>
				</Row>
			</Content>
			<Footer style={{ 'background-color': 'yellow' }}></Footer>
		</Layout>
	);
};

export default DefaultLayout;
