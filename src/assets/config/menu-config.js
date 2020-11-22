const base = 'Home'

export default [{
  name: 'basic',
  meta: {
    title: '基本',
    icon: 'el-icon-camera'
  },
  sub: [{
    name: 'BasicLayout',
    meta: {
      index: `/first`,
      title: '选项一',
      type: 'menu',
      active: false
    }
  }, {
    name: 'BasicContainer',
    meta: {
      index: `/second`,
      title: '选项二',
      type: 'menu',
      active: false
    }
  }]
}, {
  name: 'Form',
  meta: {
    title: '表单',
    icon: 'el-icon-location-outline'
  },
  sub: [{
    name: 'FormRadio',
    meta: {
      index: `/third`,
      title: '选项三',
      type: 'menu',
      active: false
    }
  },
	{
	  name: 'FormImport',
	  meta: {
	    index: `/fourth`,
	    title: '选项四',
	    type: 'menu',
	    active: false
	  }
	}]
}]
