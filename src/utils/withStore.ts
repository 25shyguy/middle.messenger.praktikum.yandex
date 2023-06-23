import Block from "./Block"
import store, { StoreEvents } from "./Store"



function withStore(Component: typeof Block) {
    return class extends Component {
        constructor(props = {}) {
            super(props);

            store.on(StoreEvents.Updated, () => {
                this.setProps({ ...props,  ...store.getState()})
            });
        }
    }
}

export default withStore;
