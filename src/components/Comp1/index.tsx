import React, {Component} from 'react';
import styles from './comp1.module.scss'
class Index extends Component {
    render() {
        return (
            <div className={styles.box}>
                <p>这是Comp1里面的内容</p>
            </div>
        );
    }
}

export default Index;