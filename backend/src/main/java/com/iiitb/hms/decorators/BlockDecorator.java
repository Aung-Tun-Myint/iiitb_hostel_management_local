package com.iiitb.hms.decorators;

import com.iiitb.hms.helper.BlockHelper;
import com.iiitb.hms.resource.Block;
import platform.decorator.BaseDecorator;
import platform.resource.BaseResource;
import platform.util.ApplicationException;
import platform.util.ExceptionSeverity;
import platform.webservice.ServletContext;

import java.util.Objects;

public class BlockDecorator extends BaseDecorator {
    public BlockDecorator(){
        super(new Block());
    }


    @Override
    public void preAddDecorator(ServletContext ctx, BaseResource _resource) throws ApplicationException{
        Block block = (Block) _resource;

        BaseResource[] blocks = BlockHelper.getInstance().getAll();

        for (BaseResource resource: blocks){
            Block b = (Block) resource;
            if (Objects.equals(block.getName(), b.getName())){
                throw new ApplicationException(ExceptionSeverity.ERROR, "Block Name already exists!");
            }
        }
    }
}
