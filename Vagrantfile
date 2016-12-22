#
# @author André Vitor Miranda <andre.miranda@gft.com>
# @package drupal-bootstrap-example
# @version 1.0.0
# @license MIT
#
# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|

  config.vm.box = "puppetlabs/ubuntu-16.04-64-puppet"
  config.vm.box_check_update = false

  unless Vagrant.has_plugin?("vagrant-librarian-puppet")
    raise "I need plugin vagrant-librarian-puppet !"
  else
    config.librarian_puppet.puppetfile_dir = "puppet"
    config.librarian_puppet.use_v1_api  = '3'
    config.librarian_puppet.destructive = true
  end

  if Vagrant.has_plugin?("vagrant-cachier")
    config.cache.auto_detect = true
    config.cache.scope = :box
  end

  config.vm.define "static" do |static|
    static.vm.hostname = "static.server.local"
    static.vm.network "forwarded_port", guest: 80, host: 8080
    #static.vm.synced_folder "./", "/vagrant" #, owner: "root", group: "root"

    static.vm.provider :virtualbox do |v|
      v.customize [
         "modifyvm", :id,
         "--name", "static.server.local",
         "--memory", 512,
         "--cpus", 2
       ]
    end

    static.vm.provision "shell", inline: <<-SHELL
      sudo -i
      apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 7F438280EF8D349F
      apt-get update -y --fix-missing
    SHELL

    static.vm.provision :puppet do |puppet|
      puppet.environment_path = "puppet/environments"
      puppet.environment = "develop"
      puppet.module_path = "puppet/modules"
      puppet.options = "--disable_warnings=deprecations"
    end
  end
end