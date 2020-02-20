import React from 'react'
import {Card, Icon, Image, Statistic,Button,} from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Image src='/img/logo.jpg'/>
        <Card.Content>
            <Card.Header>黑马福利彩票</Card.Header>
            <Card.Meta>
                <p>管理员地址: {props.manager}</p>
                <p>当前地址: {props.currentAccount}</p>
                <p>上期中奖地址: {props.winner}</p>
            </Card.Meta>
            <Card.Description>每晚八点准时开奖, 不见不散!</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user'/>
                {props.playersCounts}人参与
            </a>
        </Card.Content>
        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Value>{props.balance}ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='blue'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
                <a href='#'>点击我查看交易历史</a>
            </Statistic>
        </Card.Content>
        <Button animated='fade' color="red" onClick={props.play} disabled={props.isClicked}>
            <Button.Content visible>投注产生希望</Button.Content>
            <Button.Content hidden>购买放飞理想</Button.Content>
        </Button>
        <Button inverted color='orange'  onClick={props.KaiJiang} disabled={props.isClicked} style={{display:props.isShowButton}}>
            开奖
        </Button>
        <Button inverted color='orange' onClick={props.TuiJiang} disabled={props.isClicked} style={{display:props.isShowButton}} >
            退奖
        </Button>

    </Card>
)

export default CardExampleCard
//import  es6
