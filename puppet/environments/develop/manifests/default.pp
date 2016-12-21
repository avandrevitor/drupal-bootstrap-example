class setup {

  $basic = ['vim','git','htop','build-essential','software-properties-common','curl','iptables','iptables-persistent']

  file {[
    '/vagrant/node_modules',
    '/vagrant/bower_components'
    ]:
    ensure => 'directory',
    owner   => 'vagrant',
    recurse => true,
  }->
  package{$basic:
    ensure => installed
  }
}

class accounts {

  user {'vagrant':
    ensure    => present,
    password  => '$1$ImQjhUIS$oG7ejFp/tReDLujM2nkE80',
  }
}

node "static.server.local"{

  include setup
  include accounts

  class { '::nodejs':
    manage_package_repo       => true,
    nodejs_dev_package_ensure => 'present',
    npm_package_ensure        => 'present',
  }->
    firewall { '100 allow http and https access':
      dport   => [80],
      proto   => tcp,
      action  => accept,
    }
  /*
    ->
    nodejs::npm { 'express install':
      ensure  => '4.14.0',
      package => 'express',
      target  => '/vagrant/node_modules',
      user    => 'vagrant',
    }->
    nodejs::npm { 'bower install':
      ensure  => '^1.7.9',
      package => 'bower',
      target  => '/vagrant/node_modules',
      user    => 'vagrant',
    }->
    nodejs::npm { 'gulp install':
      ensure  => '^3.9.1',
      package => 'gulp',
      target  => '/vagrant/node_modules',
      user    => 'vagrant',
    }->
    nodejs::npm { 'gulp-clean install':
      ensure  => '^0.3.2',
      package => 'gulp-clean',
      target  => '/vagrant/node_modules',
      user    => 'vagrant',
    }->
    nodejs::npm { 'gulp-concat install':
      ensure  => '^2.6.0',
      package => 'gulp-concat',
      target  => '/vagrant/node_modules',
      user    => 'vagrant',
    }->
    nodejs::npm { 'gulp-inject install':
      ensure  => '^4.1.0',
      package => 'gulp-inject',
      target  => '/vagrant/node_modules',
      user    => 'vagrant',
    }->
    nodejs::npm { 'gulp-sass install':
      ensure  => '^2.3.2',
      package => 'gulp-sass',
      target  => '/vagrant/node_modules',
      user    => 'vagrant',
    }->
    nodejs::npm { 'gulp-uglify install':
      ensure  => '^2.0.0',
      package => 'gulp-uglify',
      target  => '/vagrant/node_modules',
      user    => 'vagrant',
    }->
  */

}